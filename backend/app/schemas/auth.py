from pydantic import BaseModel, EmailStr


class UserProfile(BaseModel):
    id: str
    email: EmailStr
    name: str
    avatar_url: str
