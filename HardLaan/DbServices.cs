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
                montlypay = newApp.tempPay
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
    }
}