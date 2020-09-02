from rest_framework import serializers
from django.contrib.auth.models import User
import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError


class UserSerializer(serializers.ModelSerializer):

    # write_only: can only write to the server
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    # data here includes username, email, password, password password_confirmation
    def validate(self, data):

        password = data.pop('password')  # removes password field
        # removes password confirmation
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise serializers.ValidationError(
                {'password_confirmation': 'Passwords do not match'})

        try:
            # to check if the password is a strong password
            validations.validate_password(password=password)
        except ValidationError as err:
            raise serializers.ValidationError({'password': err.messages})

        # here password is okay, hashed and passed into the data list
        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = ('id', 'username', 'email',
                  'password', 'password_confirmation',)
