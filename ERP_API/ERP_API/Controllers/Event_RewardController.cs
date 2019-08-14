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
    public class Event_RewardController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Event_Reward
        public List<dynamic> GetEvent_Reward()
        {
         
            db.Configuration.ProxyCreationEnabled = false;
            List<Event_Reward> Level = db.Event_Reward.Include(zz => zz.Event_Type).ToList();
            List<dynamic> toReturn = new List<dynamic>();
            foreach (Event_Reward Item in Level)
            {
                dynamic m = new ExpandoObject();
                m.EID = Item.Event_Reward_ID;
                m.EName = Item.Name;
                m.EPoints = Item.Points;
                m.EDate = Item.Date.ToShortDateString();
                m.ELocation = Item.Location;
                m.EDescription = Item.Event_Type.Description;
                toReturn.Add(m);
            }
            return toReturn;
        }

        // GET: api/Event_Reward/5
        [ResponseType(typeof(Event_Reward))]
        public IHttpActionResult GetEvent_Reward(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Event_Reward event_Reward = db.Event_Reward.Find(id);
            if (event_Reward == null)
            {
                return NotFound();
            }

            return Ok(event_Reward);
        }

        // PUT: api/Event_Reward/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEvent_Reward(int id, Event_Reward event_Reward)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != event_Reward.Event_Reward_ID)
            {
                return BadRequest();
            }

            db.Entry(event_Reward).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Event_RewardExists(id))
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

        // POST: api/Event_Reward
        [ResponseType(typeof(Event_Reward))]
        public IHttpActionResult PostEvent_Reward(Event_Reward event_Reward)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Event_Reward.Add(event_Reward);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = event_Reward.Event_Reward_ID }, event_Reward);
        }

        // DELETE: api/Event_Reward/5
        [ResponseType(typeof(Event_Reward))]
        public IHttpActionResult DeleteEvent_Reward(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Event_Reward event_Reward = db.Event_Reward.Find(id);
            if (event_Reward == null)
            {
                return NotFound();
            }

            db.Event_Reward.Remove(event_Reward);
            db.SaveChanges();

            return Ok(event_Reward);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Event_RewardExists(int id)
        {
            return db.Event_Reward.Count(e => e.Event_Reward_ID == id) > 0;
        }
    }
}