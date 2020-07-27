using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NashvilleTheatre.Models
{
    public class User
    {
        public int Uid { get; set; }
        public int TotalCredits { get; set; }
        public int CartId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int SubscriptionId { get; set; }
        public bool IsActive { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateDeleted { get; set; }

    }
    public class UserProfile
    {
        public int Uid { get; set; }
        public int TotalCredits { get; set; }
        public int CartId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int SubscriptionId { get; set; }
    }
}
