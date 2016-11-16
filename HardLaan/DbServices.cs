using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Web;
using HardLaan.Models;


namespace HardLaan
{
    public class DbServices
    {
        DatabaseModel db = new DatabaseModel();

        public bool newApplication(application newApp)
        {
            var t = new Application
            {
                userid = newApp.userid,
                email = newApp.email,
                phone = newApp.phone,
                amount = newApp.amount,
                months = newApp.months,
                montlypay = calculateRepayment(newApp.amount, newApp.months)
            };

            try
            {
                db.Applications.Add(t);
                db.SaveChanges();
                return true;

            }catch(Exception e){
                Console.Write("Could not add application! " + e);
                return false;
            }
        }

        public double calculateRepayment(int G, int n)
        {
             var r = 0.07;
             var y = (r * G) / (1 - Math.Pow(1 + r, -n));
             return Math.Round(y,2);            
        }
    }
}