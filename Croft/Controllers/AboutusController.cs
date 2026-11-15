using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Croft.Controllers
{
    public class AboutUsController : Controller
    {
       [Route("~/online-hotel-booking-naran", Name = "about-hotel-croft")]
        // GET: AboutUs
        public ActionResult Index()
        {
            return View();
        }
    }
}