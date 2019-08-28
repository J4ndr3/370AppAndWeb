using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ERP_API.Models;
using System.Dynamic;
using System.Web.Http.Cors;
using System.Data.Entity.Core.Objects;

namespace ERP_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class Patrol_LogController : ApiController
    {
        private INF370Entities db = new INF370Entities();
        public List<dynamic> GetPatrol_Log()
        {
            // GET: api/Patrol_Log
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                List<Patrol_Log> patrols = db.Patrol_Log.Include(zz => zz.Patrol_Booking).
                    Include(zz=>zz.Ranger).ToList();
                List<dynamic> toReturn = new List<dynamic>();
                foreach (Patrol_Log Item in patrols)
                {
                    dynamic m = new ExpandoObject();
                    m.Patrol_Log_ID = Item.Patrol_Log_ID;
                    m.Name = Item.Ranger.Name;
                    m.Surname = Item.Ranger.Surname;
                    m.Date = Item.Checkin.ToShortDateString();
                    m.Checkin = Item.Checkin.ToShortTimeString();
                    m.Checkout = Item.Checkout.ToShortTimeString();
                    m.CheckedIn = Item.Checked_in;
                   
                    m.time = Math.Round(Item.Checkout.Subtract(Item.Checkin).TotalHours, 2);
                    int markercount = db.Patrol_Marker.Count(ZZ => ZZ.Patrol_Log_ID == Item.Patrol_Log_ID);
                    if (markercount > 0)
                    {
                        m.MarkerPast = db.Patrol_Marker.Count(ZZ => ZZ.Patrol_Log_ID == Item.Patrol_Log_ID);
                        m.Points = db.Patrol_Marker.Where(xx => xx.Patrol_Log_ID == Item.Patrol_Log_ID).Sum(zz => zz.Marker.Marker_Type.Points_Worth);

                    }
                    else
                    {
                        m.MarkerPast = null;
                        m.Points = '0';
                    };
                    m.Feedback = db.Feedbacks.Where(xx => xx.Patrol_Log_ID == Item.Patrol_Log_ID).Select(zz=>zz.Description).FirstOrDefault();
                    toReturn.Add(m);
                }
                return toReturn;
            }
            catch (Exception err)
            {
                List<dynamic> toReturn = new List<dynamic>();
                toReturn.Add("Not readable");
                return toReturn;
            }
        }
        [System.Web.Http.Route("api/Patrol_Log/GetPatrol_LogT")]
        [HttpGet]
        public List<dynamic> GetPatrol_LogT()
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                List<Patrol_Log> patrols = db.Patrol_Log.ToList();
                List<DateTime> myList = new List<DateTime>();
                List<dynamic> toReturn = new List<dynamic>();
                foreach (Patrol_Log Item in patrols)
                {
                    
                    if (!myList.Contains(Item.Checkin.Date))
                    {
                        ;
                        myList.Add(Item.Checkin.Date);
                    }
                    
                }
                foreach (var day in myList)
                {
                    dynamic m = new ExpandoObject();
                    m.Date = day;
                    var date = day;
                    m.Hours = db.Patrol_Log.Where(zz => DbFunctions.TruncateTime(zz.Checkin) == day.Date).Sum(zz => DbFunctions.DiffHours(zz.Checkin, zz.Checkout));
                    toReturn.Add(m);
                }
                return toReturn;
            }
            catch (Exception err)
            {
                List<dynamic> toReturn = new List<dynamic>();
                toReturn.Add("Not readable");
                return toReturn;
            }
        }
        // GET: api/Patrol_Log/5
        [ResponseType(typeof(Patrol_Log))]
        public IHttpActionResult GetPatrol_Log(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Patrol_Log patrol_Log = db.Patrol_Log.Find(id);
            if (patrol_Log == null)
            {
                return NotFound();
            }

            return Ok(patrol_Log);
        }

        // PUT: api/Patrol_Log/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPatrol_Log(int id, Patrol_Log patrol_Log)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != patrol_Log.Patrol_Log_ID)
            {
                return BadRequest();
            }

            db.Entry(patrol_Log).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Patrol_LogExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Patrol_Log
        [ResponseType(typeof(Patrol_Log))]
        public IHttpActionResult PostPatrol_Log(Patrol_Log patrol_Log)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Patrol_Log.Add(patrol_Log);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = patrol_Log.Patrol_Log_ID }, patrol_Log);
        }

        // DELETE: api/Patrol_Log/5
        [ResponseType(typeof(Patrol_Log))]
        public IHttpActionResult DeletePatrol_Log(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Patrol_Log patrol_Log = db.Patrol_Log.Find(id);
            if (patrol_Log == null)
            {
                return NotFound();
            }

            db.Patrol_Log.Remove(patrol_Log);
            db.SaveChanges();

            return Ok(patrol_Log);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Patrol_LogExists(int id)
        {
            return db.Patrol_Log.Count(e => e.Patrol_Log_ID == id) > 0;
        }
    }
}