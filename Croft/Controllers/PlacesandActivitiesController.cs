using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Croft.Controllers
{
    public class PlacesandActivitiesController : Controller
    {
        [Route("~/activities-in-naran-tourist-places", Name = "placestovisitinnaran")]
        // GET: PopularActivities
        public ActionResult Index()
        {
            return View();
        }
    }
}