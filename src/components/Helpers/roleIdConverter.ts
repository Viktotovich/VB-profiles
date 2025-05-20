const roleIdConverter = (roleId: number): string => {
  switch (roleId) {
    case UserRoles.USER:
      return "User";
    case UserRoles.STUDENT:
      return "Student";
    case UserRoles.EDITOR:
      return "Editor";
    case UserRoles.POSTER:
      return "Poster";
    case UserRoles.ADMIN:
      return "Admin";
    default:
      return "Unknown Role";
  }
};

export default roleIdConverter;

enum UserRoles {
  USER = 1,
  STUDENT = 2,
  EDITOR = 3,
  POSTER = 4,
  ADMIN = 5,
}
