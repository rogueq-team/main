namespace Backend.Models
{
    public class Platform:IUser
    {
        private int? id;
        private string? login;
        private string? status = "Platform";
        public int? Id { get { return id; } set { id = value; } }
        public string Login { get { return login; } set { login = value; } }

        public void Respond() { }
    }
}
