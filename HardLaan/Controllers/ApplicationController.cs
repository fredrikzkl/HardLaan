using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Net.Http.Formatting;
using System.Data.Common;
using HardLaan.Models;

namespace HardLaan.Controllers
{
    public class ApplicationController : ApiController
    {
        DbServices db = new DbServices();

        // POST api/application
        [HttpPost]
        public HttpResponseMessage Post([FromBody]application newApp)
        {

            if (ModelState.IsValid)
            {
                if (db.newApplication(newApp))
                {
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.OK
                    };

                }
            }
            return new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.BadRequest,
                Content = new StringContent("Kunne ikke lege til ny søknad")
            };
        }

        [HttpGet]
        public HttpResponseMessage Get(string id) // Henter en spesifik
        {
            Application app = db.getApplication(id);

            var Json = new JavaScriptSerializer();
            string JsonString = Json.Serialize(app);

            return new HttpResponseMessage()
            {

                Content = new StringContent(JsonString, Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.OK
            };
        }


        [HttpGet]
        public HttpResponseMessage Get() //Henter ut alle
        {
            List<application> applicationList = db.getAllApplications();

            var Json = new JavaScriptSerializer();
            string JsonString = Json.Serialize(applicationList);

            return new HttpResponseMessage()
            {
                Content = new StringContent(JsonString, Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.OK
            };
        }


        public HttpResponseMessage Put(string id, [FromBody]application inputApp)
        {
            if (ModelState.IsValid)
            {
                bool OK = db.editApplication(id, inputApp);
                if (OK)
                {
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.OK
                    };
                }
            }
            return new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.NotFound,
                Content = new StringContent("Kunne ikke endre søknaden, en feil oppsto")
            };

        }


    }
}
