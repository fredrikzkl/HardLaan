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

        public Application getApplication(string id)
        {
            try {
                Application ap = db.Applications.Where(a => a.userid == id).First();
                return ap;
            }
            catch (Exception)
            {
                return null;
            }
            
        }

        public List<application> getAllApplications()
        {
            List<application> temp = db.Applications.Select(a => new application()
            {
                userid = a.userid,
                amount = a.amount,
                email = a.email,
                months  = a.months,
                pay = a.montlypay,
                phone = a.phone
            }).ToList();
            return temp;
        }


        public double calculateRepayment(int G, int n)
        {
             var r = 0.07;
             var y = (r * G) / (1 - Math.Pow(1 + r, -n));
             return Math.Round(y,2);            
        }

        public bool editApplication(string id, application inputApp)
        {
            //finner gammle application
            Application temp = db.Applications.FirstOrDefault(k => k.userid == id);
            if (temp == null)
            {
                return false;
            }
            // endrer verdier
            temp.email = inputApp.email;
            temp.phone = inputApp.phone;
            temp.amount = inputApp.amount;
            temp.months = inputApp.months;
            temp.montlypay = inputApp.pay;

            
            try
            {
                // lagre kunden
                db.SaveChanges();
            }
            catch (Exception feil)
            {
                Console.Write(feil);
                return false;
            }
            return true;
        }
    }
}