import cloudinary
import cloudinary.uploader
from backend.app.core.config import settings

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True
)

class CloudinaryService:
    @staticmethod
    def upload_image(file_content, folder="properties"):
        # Gracefully fallback to Base64 data URI if Cloudinary credentials are not set
        if not settings.CLOUDINARY_CLOUD_NAME or not settings.CLOUDINARY_API_KEY or not settings.CLOUDINARY_API_SECRET:
            try:
                import base64
                if hasattr(file_content, "seek"):
                    file_content.seek(0)
                    contents = file_content.read()
                else:
                    contents = file_content
                base64_data = base64.b64encode(contents).decode("utf-8")
                return {
                    "url": f"data:image/jpeg;base64,{base64_data}",
                    "public_id": "fallback_base64"
                }
            except Exception as e:
                print(f"Base64 upload fallback error: {e}")
                return None

        try:
            upload_result = cloudinary.uploader.upload(
                file_content,
                folder=folder,
                resource_type="image"
            )
            return {
                "url": upload_result.get("secure_url"),
                "public_id": upload_result.get("public_id")
            }
        except Exception as e:
            print(f"Cloudinary upload error: {e}")
            return None

    @staticmethod
    def delete_image(public_id):
        try:
            cloudinary.uploader.destroy(public_id)
            return True
        except Exception as e:
            print(f"Cloudinary delete error: {e}")
            return False
