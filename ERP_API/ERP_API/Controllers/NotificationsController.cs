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
using System.Web.Http.Cors;
using System.Dynamic;

namespace ERP_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class NotificationsController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Notifications
        public List<dynamic> GetNotifications()
        {
            List<dynamic> toReturn = new List<dynamic>();
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                List<Notification> note = db.Notifications
                    .Include(zz=>zz.Ranger).ToList();

                foreach (Notification Item in note)
                {
                    dynamic m = new ExpandoObject();
                    m.ID = Item.Notification_ID;
                    m.Date = Item.Date;
                    m.Message = Item.Meassage;
                    m.Ranger = Item.Ranger.Name + " " + Item.Ranger.Surname;
                    toReturn.Add(m);
                }
                return toReturn;
            }
            catch (Exception err)
            {
                toReturn.Add("Not readable");
                return toReturn;
            }


        }
        // GET: api/Notifications/5
        [ResponseType(typeof(Notification))]
        public IHttpActionResult GetNotification(int id)
        {
            Notification notification = db.Notifications.Find(id);
            if (notification == null)
            {
                return NotFound();
            }

            return Ok(notification);
        }

        // PUT: api/Notifications/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutNotification(int id, Notification notification)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != notification.Notification_ID)
            {
                return BadRequest();
            }

            db.Entry(notification).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NotificationExists(id))
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

        // POST: api/Notifications
        [ResponseType(typeof(Notification))]
        public IHttpActionResult PostNotification(Notification notification)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Notifications.Add(notification);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = notification.Notification_ID }, notification);
        }

        // DELETE: api/Notifications/5
        [ResponseType(typeof(Notification))]
        public IHttpActionResult DeleteNotification(int id)
        {
            Notification notification = db.Notifications.Find(id);
            if (notification == null)
            {
                return NotFound();
            }

            db.Notifications.Remove(notification);
            db.SaveChanges();

            return Ok(notification);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NotificationExists(int id)
        {
            return db.Notifications.Count(e => e.Notification_ID == id) > 0;
        }
    }
}