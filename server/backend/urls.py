
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ViewCourse

router = DefaultRouter()
router.register(r"course-list", ViewCourse,basename="course-list")

urlpatterns = [
    path("", include(router.urls),name="course=list-data")
]

