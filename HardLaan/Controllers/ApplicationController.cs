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


namespace HardLaan.Controllers
{
    public class ApplicationController : ApiController
    {
        
        // POST api/application
        [HttpPost]
        public HttpResponseMessage Post([FromBody]ApplicationVM innKunde)
        {

            if (ModelState.IsValid)
            {
                bool OK = kundeDb.lagreEnKunde(innKunde);
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
                StatusCode = HttpStatusCode.BadRequest,
                Content = new StringContent("Kunne ikke sette inn kunden i DB")
            };
        }

    }
}
