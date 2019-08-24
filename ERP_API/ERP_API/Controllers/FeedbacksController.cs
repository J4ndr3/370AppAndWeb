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

namespace ERP_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class FeedbacksController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Feedbacks
        public List<dynamic> GetFeedbacks()
        {
           
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
               
                List<Feedback> feedbacks = db.Feedbacks.Include(zz => zz.Patrol_Log).
                    Include(zz => zz.Patrol_Log.Ranger).ToList();
                List<dynamic> toReturn = new List<dynamic>();
                foreach (Feedback Item in feedbacks)
                {
                    dynamic m = new ExpandoObject();
                    m.Feedback_ID = Item.Feedback_ID;
                    m.Name = Item.Patrol_Log.Ranger.Name;
                    m.Surname = Item.Patrol_Log.Ranger.Surname;
                    m.Date = Item.Patrol_Log.Checkin.ToShortDateString();
                    m.Checkin = Item.Patrol_Log.Checkin.ToShortTimeString();
                    m.Checkout = Item.Patrol_Log.Checkout.ToShortTimeString();
                    m.time = Math.Round(Item.Patrol_Log.Checkout.Subtract(Item.Patrol_Log.Checkin).TotalHours,2);
                    m.Route = Item.Patrol_Log.Route;
                    m.Feedback = Item.Description;
                    m.MarkerPast = db.Patrol_Marker.Count(ZZ => ZZ.Patrol_Log_ID == Item.Patrol_Log_ID);
                    m.Points = db.Patrol_Marker.Where(xx => xx.Patrol_Log_ID == Item.Patrol_Log_ID).Sum(zz => zz.Marker.Marker_Type.Points_Worth);
                   
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


        // GET: api/Feedbacks/5
        [ResponseType(typeof(Feedback))]
        public IHttpActionResult GetFeedback(int id)
        {
            Feedback feedback = db.Feedbacks.Find(id);
            if (feedback == null)
            {
                return NotFound();
            }

            return Ok(feedback);
        }

        // PUT: api/Feedbacks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFeedback(int id, Feedback feedback)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != feedback.Feedback_ID)
            {
                return BadRequest();
            }

            db.Entry(feedback).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FeedbackExists(id))
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

        // POST: api/Feedbacks
        [ResponseType(typeof(Feedback))]
        public IHttpActionResult PostFeedback(Feedback feedback)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Feedbacks.Add(feedback);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = feedback.Feedback_ID }, feedback);
        }

        // DELETE: api/Feedbacks/5
        [ResponseType(typeof(Feedback))]
        public IHttpActionResult DeleteFeedback(int id)
        {
            Feedback feedback = db.Feedbacks.Find(id);
            if (feedback == null)
            {
                return NotFound();
            }

            db.Feedbacks.Remove(feedback);
            db.SaveChanges();

            return Ok(feedback);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FeedbackExists(int id)
        {
            return db.Feedbacks.Count(e => e.Feedback_ID == id) > 0;
        }
    }
}