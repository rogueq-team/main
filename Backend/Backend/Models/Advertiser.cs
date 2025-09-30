using System;

namespace Backend.Models
{
    public class Advertiser:IUser
    {
        private int? id;
        private string? login;
        private string? status = "Advertiser";
        public int? Id { get { return id; } set { id = value; } }
        public string Login { get { return login; } set { login = value; } }

        public void PlaceOrder() { }
        public void OfferAdvertisement() { }
    }
}
