using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Croft.Controllers
{
    public class ContactUsController : Controller
    {
        [Route("~/hotel-naran-contact-number", Name = "contact-hotel-croft")]
        // GET: ContactUs hotel-naran-contact-number
        public ActionResult Index()
        {
            return View();
        }
    }
}