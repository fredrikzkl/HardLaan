using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HardLaan.Models
{
    public class application
    {
        public string userid { get; set; }
        public string email { get; set; }
        public string phone { get; set; }

        public int amount { get; set; }
        public int months { get; set; }
        public double pay { get; set; }

    }
}