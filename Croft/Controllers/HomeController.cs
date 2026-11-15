using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Croft.Models;

namespace Croft.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            RoomList();
            return View();
        }

        //[HttpPost]
        public ActionResult PropertySearch(string CheckIn, string CheckOut, int Adults, int Children, int NoOfRooms)
        {
            Session["params"] = CheckIn + "&" + CheckOut + "&" + Adults + "&" + Children + "&" + NoOfRooms;
            return RedirectToAction("SearchResults", "SearchResult", new { @CheckIn = CheckIn, @CheckOut = CheckOut, @Adults = Adults, @Children = Children, @NoOfRooms = NoOfRooms });
        }

        [HttpPost]
        public ActionResult PropertySearchMob(string CheckInMob, string CheckOutMob, int Adults, int Children, int NoOfRooms)
        {
            Session["params"] = CheckInMob + "&" + CheckOutMob + "&" + Adults + "&" + Children + "&" + NoOfRooms;
            return RedirectToAction("SearchResults", "SearchResult", new { @CheckIn = CheckInMob, @CheckOut = CheckOutMob, @Adults = Adults, @Children = Children, @NoOfRooms = NoOfRooms });
        }

        [HttpPost]
        public ActionResult PropertySearchMod(string CheckInM, string CheckOutM, int Adults, int Children, int NoOfRooms)
        {
            Session["params"] = CheckInM + "&" + CheckOutM + "&" + Adults + "&" + Children + "&" + NoOfRooms;
            return RedirectToAction("SearchResults", "SearchResult", new { @CheckIn = CheckInM, @CheckOut = CheckOutM, @Adults = Adults, @Children = Children, @NoOfRooms = NoOfRooms });
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult NoPageFound()
        {
            return View();
        }
        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Image(string img)
        {
            var image = "C:\\inetpub\\wwwroot\\Croft\\Uploads\\" + img;
            //string path = image.Path; // could be any absolute path anywhere on your server, for example c:\foo\bar.jpg
            string contentType = "image/jpg"; // image.ContentType; // for example image/jpg
            return File(image, contentType);
        }
        public string RoomList()
        {
            try
            {

                // string jsonString = "";
                // var responseBasicProfile = new ResponsePropertySearch();
                using (var db = new IconicDBEntities())
                {
                    var roomList = (from a in db.Rooms
                                    join b in db.RoomCategories
                                    on a.RoomCategory equals b.Id                                   
                                    where a.Status == true
                                    select new PropertySearch
                                    {
                                        Id = a.ID,
                                        RoomCode = a.RoomCode,
                                        RoomCateCode = a.RoomCategory,
                                        RoomCategory = b.Category,
                                        RoomDescription = a.RoomDescription,
                                        PropertyId = a.propertyID,
                                        BedType = a.BedType,
                                        CheckIn = a.CheckIn,
                                        CheckOut = a.CheckOut,
                                        NoOfRooms = a.NoOfRooms,
                                        Capacity = a.Capacity,
                                        Adult = a.Adult,
                                        NoOfChild = a.NoOfChild,
                                        ChildAge = a.ChildAge,
                                        ShortCode = a.ShortCode,
                                        MinimumPrice = a.MinimumPrice,
                                        MinimumStay = a.MinimumStay,
                                        MaximumStay = a.MaximumStay,
                                        Size = a.Size,
                                        Features = a.Features,
                                        imgURL = ""
                                    }).ToList();

                    foreach(var itm in roomList)
                    {
                        int v = VacantRooms(itm.RoomCode);
                        itm.NoOfRooms = itm.NoOfRooms - v;
                    }

                    foreach (var itm in roomList)
                    {
                        string v = RoomPic(itm.RoomCateCode);
                        itm.imgURL = v;
                    }


                    TempData["roomList"] = roomList;
                }

                return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public int VacantRooms(int? roomCode)
        {
            try
            {
                int vacantRooms = 0;


                // string jsonString = "";
                // var responseBasicProfile = new ResponsePropertySearch();
                using (var db = new IconicDBEntities())
                {
                    vacantRooms = db.RoomNumbers.Count(x => x.RoomCode == roomCode && x.Status == false);

                    //TempData["vacantRooms"] = vacantRooms;
                }

                return vacantRooms; // Content(vacantRooms.ToString());
            }
            catch (Exception ex)
            {
                return 0;// Content(ex.Message);
            }
        }

        public string RoomPic(int? roomCate)
        {
            try
            {
                string roomPic = "";


                // string jsonString = "";
                // var responseBasicProfile = new ResponsePropertySearch();
                using (var db = new IconicDBEntities())
                {
                    roomPic = db.RoomPictures.Where(x => x.RoomCode == roomCate).Select(x => x.Picture).FirstOrDefault();

                    //TempData["vacantRooms"] = vacantRooms;
                }

                return roomPic; // Content(vacantRooms.ToString());
            }
            catch (Exception ex)
            {
                return "";// Content(ex.Message);
            }
        }

    }

    public class PropertySearch
    {
        public int? Id { get; set; }
        public int? RoomCode { get; set; }
        public int? RoomCateCode { get; set; }
        public string RoomCategory { get; set; }
        public string RoomDescription { get; set; }
        public string CheckIn { get; set; }
        public string CheckOut { get; set; }
        public int? Normalprice { get; set; }
        public int? AdultAllowed { get; set; }
        public int? AdultPaxs { get; set; }
        public int? ExtraAdultPrice { get; set; }
        public int? NoOfChildAllowed { get; set; }
        public int? ChildPaxs { get; set; }
        public int? ExtraChildPrice { get; set; }
        public int? ChildAge { get; set; }
        public int? discountedprice { get; set; }
        public int? NoOfRooms { get; set; }
        public int? Capacity { get; set; }
        public DateTime? dateCreated { get; set; }
        public int? NoofDays { get; set; }
        public string imgURL { get; set; }
        public string BedType { get; set; }
        public int? TaxAmount { get; set; }
        public int? TaxPercent { get; set; }
        public int? TotalAmount { get; set; }
        public int? DiscountedAmount { get; set; }
        public int? PropertyId { get; set; }
        public int? NoOfRoomsRequired { get; set; }
        public int? Adult { get; set; }
        public int? NoOfChild { get; set; }
        public string ShortCode { get; set; }
        public int? MinimumPrice { get; set; }
        public int? MinimumStay { get; set; }
        public int? MaximumStay { get; set; }
        public int? Size { get; set; }
        public string Features { get; set; }
        public int? rateplanId { get; set; }
        public string Name { get; set; }
        public bool? WantStayMinimumLength { get; set; }
        public Int16? StayMinimumLength { get; set; }
        public int? CancellationPolicy { get; set; }
        public bool? WantToIncludeMeals { get; set; }
        public bool? Breakfast { get; set; }
        public bool? Lunch { get; set; }
        public bool? Dinner { get; set; }
        public bool? DaysBeforeCheckIn { get; set; }
        public Int16? NumberOfDaysBeforeCheckIn { get; set; }
        public Int16? Discount { get; set; }
        public string RoomTypes { get; set; }
        public int? RoomType { get; set; }
        public string VideoLink { get; set; }
    }
}