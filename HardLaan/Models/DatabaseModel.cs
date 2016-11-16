using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Web;
using System.Data.Entity.Core.EntityClient;
using System.Data.Common;

namespace HardLaan.Models
{

    public class Application
    {
        [Key]
        public string userid { get; set; }
        public string email { get; set; }
        public string phone { get; set; }

        public int amount { get; set; }
        public int months { get; set; }
        public double montlypay { get; set; }
    }

    public class DatabaseModel : DbContext
    {
        public DatabaseModel()
            : base("name=HardLaan")
        {
            Database.CreateIfNotExists();
        }

        public DbSet<Application> Applications { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }


}