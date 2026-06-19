from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import update, delete
from backend.app.models.property import Property, PropertyImage
from backend.app.schemas.property import PropertyCreate, PropertyUpdate
from typing import List, Optional

from sqlalchemy.orm import selectinload

class PropertyService:
    @staticmethod
    async def get_all(
        db: AsyncSession, 
        skip: int = 0, 
        limit: int = 100,
        property_type: Optional[str] = None,
        category: Optional[str] = None,
        location: Optional[str] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
        bedrooms: Optional[int] = None,
        sortBy: Optional[str] = None
    ) -> List[Property]:
        stmt = select(Property).options(selectinload(Property.images))
        
        if property_type and property_type.lower() != 'all':
            stmt = stmt.where(Property.property_type == property_type)
            
        if category and category.lower() != 'all':
            stmt = stmt.where(Property.category == category)
        
        if location:
            stmt = stmt.where(Property.location.ilike(f"%{location}%"))
            
        if min_price is not None:
            stmt = stmt.where(Property.price_value >= min_price)
            
        if max_price is not None:
            stmt = stmt.where(Property.price_value <= max_price)
            
        if bedrooms is not None:
            if bedrooms >= 4:
                stmt = stmt.where(Property.bedrooms >= 4)
            else:
                stmt = stmt.where(Property.bedrooms == bedrooms)
                
        if sortBy == 'price_asc':
            stmt = stmt.order_by(Property.price_value.asc())
        elif sortBy == 'price_desc':
            stmt = stmt.order_by(Property.price_value.desc())
        elif sortBy == 'area_desc':
            stmt = stmt.order_by(Property.area_sqft.desc())
        else:
            stmt = stmt.order_by(Property.id.desc())
            
        result = await db.execute(stmt.offset(skip).limit(limit))
        return result.scalars().all()

    @staticmethod
    async def get_by_id(db: AsyncSession, property_id: int) -> Optional[Property]:
        result = await db.execute(
            select(Property)
            .options(selectinload(Property.images))
            .where(Property.id == property_id)
        )
        return result.scalars().first()

    @staticmethod
    async def get_featured(db: AsyncSession) -> List[Property]:
        result = await db.execute(
            select(Property)
            .options(selectinload(Property.images))
            .where(Property.featured == True)
        )
        return result.scalars().all()

    @staticmethod
    async def create(db: AsyncSession, property_in: PropertyCreate) -> Property:
        db_property = Property(**property_in.model_dump())
        db.add(db_property)
        await db.commit()
        return await PropertyService.get_by_id(db, db_property.id)

    @staticmethod
    async def update(db: AsyncSession, property_id: int, property_in: PropertyUpdate) -> Optional[Property]:
        await db.execute(
            update(Property)
            .where(Property.id == property_id)
            .values(**property_in.model_dump(exclude_unset=True))
        )
        await db.commit()
        return await PropertyService.get_by_id(db, property_id)

    @staticmethod
    async def delete(db: AsyncSession, property_id: int) -> bool:
        await db.execute(delete(Property).where(Property.id == property_id))
        await db.commit()
        return True

    @staticmethod
    async def add_image(db: AsyncSession, property_id: int, image_url: str, is_main: bool = False) -> PropertyImage:
        db_image = PropertyImage(property_id=property_id, image_url=image_url, is_main=is_main)
        db.add(db_image)
        await db.commit()
        await db.refresh(db_image)
        return db_image

    @staticmethod
    async def delete_image(db: AsyncSession, image_id: int) -> bool:
        await db.execute(delete(PropertyImage).where(PropertyImage.id == image_id))
        await db.commit()
        return True
