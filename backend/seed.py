import asyncio
import os
import sys

# Ensure backend directory is in python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.future import select
from backend.app.database.session import Base, engine, async_session
from backend.app.models.admin import Admin
from backend.app.models.property import Property, PropertyImage
from backend.app.core.security import get_password_hash

async def seed_data():
    print("Initializing database connection...")
    
    # 1. Create tables if they do not exist (useful for SQLite fallback)
    async with engine.begin() as conn:
        print("Creating tables if they do not exist...")
        await conn.run_sync(Base.metadata.create_all)
    
    async with async_session() as db:
        # 2. Check and seed Admin user
        result = await db.execute(select(Admin).where(Admin.username == "admin"))
        admin = result.scalars().first()
        if not admin:
            print("Creating default admin user (admin / password123)...")
            hashed_pwd = get_password_hash("password123")
            new_admin = Admin(username="admin", hashed_password=hashed_pwd, is_active=True)
            db.add(new_admin)
            await db.commit()
        else:
            print("Admin user already exists.")

        # 3. Check and seed Properties
        prop_check = await db.execute(select(Property).limit(1))
        existing_prop = prop_check.scalars().first()
        if not existing_prop:
            print("Database has no properties. Seeding sample properties...")
            
            sample_properties = [
                {
                    "title": "Luxury 3 BHK Villa",
                    "description": "Premium 3 BHK villa with private garden, modern kitchen, spacious balcony and lake view. Located in a secured gated community with clubhouse and 24/7 security.",
                    "property_type": "House",
                    "category": "sale",
                    "price": "₹1.75 Cr",
                    "price_value": 17500000.0,
                    "location": "Whitefield, Bangalore",
                    "district": "Bangalore Urban",
                    "state": "Karnataka",
                    "area_sqft": 2400.0,
                    "bedrooms": 3,
                    "bathrooms": 3,
                    "featured": True,
                    "images": [
                        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
                        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
                    ]
                },
                {
                    "title": "Modern 2 BHK Flat",
                    "description": "Well-maintained 2 BHK flat in a high-rise tower. Very close to IT parks and metro station. Features 2 balconies, modular wardrobes, and pipeline gas connection.",
                    "property_type": "House",
                    "category": "rent",
                    "price": "₹42,000/mo",
                    "price_value": 42000.0,
                    "location": "Hinjewadi, Pune",
                    "district": "Pune",
                    "state": "Maharashtra",
                    "area_sqft": 1150.0,
                    "bedrooms": 2,
                    "bathrooms": 2,
                    "featured": False,
                    "images": [
                        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
                    ]
                },
                {
                    "title": "Residential Plots in Premium Venture",
                    "description": "East-facing residential plots in a fully developed layout with BT roads, underground drainage, electricity, and park area. Clear titles and immediate registration.",
                    "property_type": "Plot",
                    "category": "sale",
                    "price": "₹25 Lakhs",
                    "price_value": 2500000.0,
                    "location": "Kothapatnam Road, Ongole",
                    "district": "Prakasam",
                    "state": "Andhra Pradesh",
                    "area_sqft": 1800.0,
                    "bedrooms": None,
                    "bathrooms": None,
                    "featured": True,
                    "images": [
                        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
                    ]
                },
                {
                    "title": "Premium Corner Plot",
                    "description": "An excellent corner residential plot (North-East facing) in prime residential layout. Perfect layout, clear title, spot registration with 40 feet wide approach roads.",
                    "property_type": "Plot",
                    "category": "sale",
                    "price": "₹45 Lakhs",
                    "price_value": 4500000.0,
                    "location": "Devi Nagar, Ongole",
                    "district": "Prakasam",
                    "state": "Andhra Pradesh",
                    "area_sqft": 2400.0,
                    "bedrooms": None,
                    "bathrooms": None,
                    "featured": False,
                    "images": [
                        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
                    ]
                },
                {
                    "title": "Industrial Warehouse Lease",
                    "description": "Ready-to-move industrial warehouse with excellent ceiling height, heavy-load concrete flooring, fire safety equipment, and ample space for heavy container parking and loading.",
                    "property_type": "Warehouse",
                    "category": "rent",
                    "price": "₹1.2 Lakhs/mo",
                    "price_value": 120000.0,
                    "location": "Trunk Road, Kandukur",
                    "district": "Prakasam",
                    "state": "Andhra Pradesh",
                    "area_sqft": 8500.0,
                    "bedrooms": None,
                    "bathrooms": None,
                    "featured": True,
                    "images": [
                        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
                    ]
                },
                {
                    "title": "Commercial Space / Godown",
                    "description": "Spacious commercial warehouse/godown in central trade location. Perfect storage for consumer electronics, FMCG products or pharmaceutical distributors. Easy truck loading access.",
                    "property_type": "Warehouse",
                    "category": "rent",
                    "price": "₹80,000/mo",
                    "price_value": 80000.0,
                    "location": "Nellore Bypass, Nellore",
                    "district": "Nellore",
                    "state": "Andhra Pradesh",
                    "area_sqft": 4500.0,
                    "bedrooms": None,
                    "bathrooms": None,
                    "featured": False,
                    "images": [
                        "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80"
                    ]
                }
            ]

            for item in sample_properties:
                images = item.pop("images")
                # Create property
                prop = Property(**item)
                db.add(prop)
                await db.flush() # Flush to get prop.id
                
                # Add images
                for i, img_url in enumerate(images):
                    prop_image = PropertyImage(
                        property_id=prop.id,
                        image_url=img_url,
                        is_main=(i == 0)
                    )
                    db.add(prop_image)
                    
            await db.commit()
            print("Successfully seeded database properties!")
        else:
            print("Database already has property listings.")

if __name__ == "__main__":
    asyncio.run(seed_data())
