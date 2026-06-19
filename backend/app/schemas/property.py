from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime

class PropertyImageBase(BaseModel):
    image_url: str
    is_main: bool = False

class PropertyImageCreate(PropertyImageBase):
    pass

class PropertyImage(PropertyImageBase):
    id: int
    property_id: int
    
    model_config = ConfigDict(from_attributes=True)

class PropertyBase(BaseModel):
    title: str
    description: str
    property_type: str
    category: str = "sale"
    price: str
    price_value: Optional[float] = None
    location: str
    district: str = "Ongole"
    state: str = "Andhra Pradesh"
    area_sqft: Optional[float] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    featured: bool = False
    is_sold: bool = False

class PropertyCreate(PropertyBase):
    pass

class PropertyUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    property_type: Optional[str] = None
    category: Optional[str] = None
    price: Optional[str] = None
    price_value: Optional[float] = None
    location: Optional[str] = None
    district: Optional[str] = None
    state: Optional[str] = None
    area_sqft: Optional[float] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    featured: Optional[bool] = None
    is_sold: Optional[bool] = None

class Property(PropertyBase):
    id: int
    created_at: datetime
    images: List[PropertyImage] = []
    
    model_config = ConfigDict(from_attributes=True)
