namespace Backend.Models
{
    public class Administrator:IUser
    {
        private int? id;
        private string? login;
        private string? status = "Administrator";
        public int? Id { get { return id; } set { id = value; } }
        public string Login { get { return login; } set { login = value; } }

    }
}
