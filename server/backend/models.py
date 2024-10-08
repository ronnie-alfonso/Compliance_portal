from django.db import models

# Create your models here.
class Course(models.Model):
    course_name = models.CharField(max_length=500)
    description = models.CharField(max_length=500)
    image = models.CharField(max_length=500)
    pdf_name = models.CharField(max_length=500)
    date_created = models.DateField(auto_now=True)


    def _str_(self):
        return self.course_name
  

   