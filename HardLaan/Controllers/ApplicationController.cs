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
                Content = new StringContent("Kunne ikke sette inn kunden i DB")
            };
        }

    }
}
