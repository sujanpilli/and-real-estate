from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.database.session import get_db
from backend.app.services.property import PropertyService
from backend.app.schemas.property import Property, PropertyCreate, PropertyUpdate
from backend.app.api.auth import get_current_admin
from backend.app.models.admin import Admin
from backend.app.services.cloudinary import CloudinaryService
from typing import List, Optional

router = APIRouter(prefix="/properties", tags=["properties"])

@router.get("/", response_model=List[Property])
async def get_properties(
    skip: int = 0, 
    limit: int = 100, 
    property_type: Optional[str] = None,
    category: Optional[str] = None,
    location: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    bedrooms: Optional[int] = None,
    sortBy: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    return await PropertyService.get_all(
        db, 
        skip=skip, 
        limit=limit,
        property_type=property_type,
        category=category,
        location=location,
        min_price=min_price,
        max_price=max_price,
        bedrooms=bedrooms,
        sortBy=sortBy
    )

@router.get("/featured", response_model=List[Property])
async def get_featured_properties(db: AsyncSession = Depends(get_db)):
    return await PropertyService.get_featured(db)

@router.get("/{property_id}", response_model=Property)
async def get_property(property_id: int, db: AsyncSession = Depends(get_db)):
    db_property = await PropertyService.get_by_id(db, property_id)
    if not db_property:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Property not found")
    return db_property

@router.post("/", response_model=Property)
async def create_property(
    property_in: PropertyCreate, 
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    return await PropertyService.create(db, property_in)

@router.put("/{property_id}", response_model=Property)
async def update_property(
    property_id: int, 
    property_in: PropertyUpdate, 
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    db_property = await PropertyService.update(db, property_id, property_in)
    if not db_property:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Property not found")
    return db_property

@router.delete("/{property_id}")
async def delete_property(
    property_id: int, 
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    success = await PropertyService.delete(db, property_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Property not found")
    return {"message": "Property deleted successfully"}

@router.post("/{property_id}/images")
async def upload_property_image(
    property_id: int,
    file: UploadFile = File(...),
    is_main: bool = False,
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    db_property = await PropertyService.get_by_id(db, property_id)
    if not db_property:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Property not found")
    
    upload_result = CloudinaryService.upload_image(file.file)
    if not upload_result:
        raise HTTPException(status_code=400, detail="Image upload failed")
    
    db_image = await PropertyService.add_image(db, property_id, upload_result["url"], is_main)
    return db_image

@router.delete("/images/{image_id}")
async def delete_property_image(
    image_id: int,
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    # In a real app, we should also delete from Cloudinary
    # but that requires storing the public_id in the DB
    success = await PropertyService.delete_image(db, image_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image not found")
    return {"message": "Image deleted successfully"}
