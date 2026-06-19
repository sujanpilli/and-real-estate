from sqlalchemy import String, Integer, Float, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from backend.app.database.session import Base

class Property(Base):
    __tablename__ = "properties"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(Text)
    property_type: Mapped[str] = mapped_column(String(50)) # Plot, House, Warehouse
    category: Mapped[str] = mapped_column(String(50), default="sale") # sale or rent
    price: Mapped[str] = mapped_column(String(100)) # e.g. "₹15 Lakhs"
    price_value: Mapped[float] = mapped_column(Float, nullable=True) # numeric for sorting
    
    location: Mapped[str] = mapped_column(String(255))
    district: Mapped[str] = mapped_column(String(100), default="Ongole")
    state: Mapped[str] = mapped_column(String(100), default="Andhra Pradesh")
    
    area_sqft: Mapped[float] = mapped_column(Float, nullable=True)
    bedrooms: Mapped[int] = mapped_column(Integer, nullable=True)
    bathrooms: Mapped[int] = mapped_column(Integer, nullable=True)
    
    latitude: Mapped[float] = mapped_column(Float, nullable=True)
    longitude: Mapped[float] = mapped_column(Float, nullable=True)
    
    featured: Mapped[bool] = mapped_column(Boolean, default=False)
    is_sold: Mapped[bool] = mapped_column(Boolean, default=False)
    
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    
    images: Mapped[list["PropertyImage"]] = relationship(back_populates="property", cascade="all, delete-orphan")

class PropertyImage(Base):
    __tablename__ = "property_images"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    property_id: Mapped[int] = mapped_column(ForeignKey("properties.id"))
    image_url: Mapped[str] = mapped_column(String(500))
    is_main: Mapped[bool] = mapped_column(Boolean, default=False)
    
    property: Mapped["Property"] = relationship(back_populates="images")
