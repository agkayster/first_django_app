from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:  # safe methods are GET
            return True

        # Instance must have an attribute named `owner`.
        # if currently loggedin user is the one that updated the movie, he should see content dialogue box
        return obj.user == request.user
