﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NashvilleTheatre.Models
{
    public class Show
    {
        public int ShowId { get; set; }
        public int TheatreCoId { get; set; }
        public int VenueId { get; set; }
        public string ShowName { get; set; }
        public string Synopsis { get; set; }
        public int CreditCost { get; set; }
        public int CategoryId { get; set; }
        public string ShowImageUrl { get; set; }
    }

    public class ShowNameOnly
    {
        public int ShowId { get; set; }
        public string ShowName { get; set; }
    }

    public class ShowDate
    {
        public int ShowId { get; set; }
        public int ShowDateTimeId { get; set; }
        public DateTime ShowDateTime { get; set; }
    }
}
