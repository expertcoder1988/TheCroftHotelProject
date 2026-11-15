using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Croft.Controllers
{
    public class GalleryController : Controller
    {
        [Route("~/naran-hotel-pictures", Name = "galleryhotelnaran")]
        // GET: Gallery
        public ActionResult Index()
        {
            return View();
        }
    }
}