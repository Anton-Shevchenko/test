from django.contrib.auth import get_user_model
from django.utils import timezone

from rest_framework import serializers

from .models.models import Post

User = get_user_model()


class UserPublicSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False, allow_blank=True, read_only=True)

    class Meta:
        model = User
        fields = [
            'username',
            'first_name',
            'last_name',
        ]


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    def create(self, validated_data):

        user = User.objects.create(
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

    class Meta:
        model = User
        # Tuple of serialized model fields (see link [2])
        fields = ( "id", "username", "password", "email",)


class PostSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        # view_name='skill-api:detail',
        view_name='detail',
        lookup_field='slug'
    )
    user = UserPublicSerializer(read_only=True)
    publish = serializers.DateField(default=timezone.now())

    class Meta:
        model = Post
        fields = [
            'url',
            'slug',
            'user',
            'title',
            'content',
            'draft',
            'publish',
            'updated',
            'timestamp',
        ]
