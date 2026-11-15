using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Croft.Controllers
{
    public class RestaurantController : Controller
    {
        [Route("~/naran-restaurant", Name = "naranrestaurant")]
        // GET: Restaurant 
        public ActionResult Index()
        {
            return View();
        }
    }
}