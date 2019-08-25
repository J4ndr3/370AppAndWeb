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
    public class Redeem_RewardController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Redeem_Reward
        public List<dynamic> GetRedeem_Reward()
        {
            db.Configuration.ProxyCreationEnabled = false;
            List<Redeem_Reward> Level = db.Redeem_Reward.ToList();
            List<dynamic> toReturn = new List<dynamic>();
            foreach (Redeem_Reward Item in Level)
            {
                dynamic m = new ExpandoObject();
                //m.ID = Item.Event_Reward_ID;
                m.Redeem_ID = Item.Redeem_ID;
                m.Ranger_ID = Item.Ranger_ID;
                m.Voucher_Code = Item.Voucher_code;
                m.Product_Reward_ID = Item.Product_Reward_ID;
                m.Event_Reward_ID = Item.Event_Reward_ID;
                m.Date = Item.DateTime.ToShortDateString();
                toReturn.Add(m);
            }
            return toReturn;
        }

        // GET: api/Redeem_Reward/5
        [ResponseType(typeof(Redeem_Reward))]
        public IHttpActionResult GetRedeem_Reward(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Redeem_Reward redeem_Reward = db.Redeem_Reward.Find(id);
            if (redeem_Reward == null)
            {
                return NotFound();
            }

            return Ok(redeem_Reward);
        }

        // PUT: api/Redeem_Reward/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRedeem_Reward(int id, Redeem_Reward redeem_Reward)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != redeem_Reward.Redeem_ID)
            {
                return BadRequest();
            }

            db.Entry(redeem_Reward).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Redeem_RewardExists(id))
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

        // POST: api/Redeem_Reward
        [ResponseType(typeof(Redeem_Reward))]
        public IHttpActionResult PostRedeem_Reward(Redeem_Reward redeem_Reward)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Redeem_Reward.Add(redeem_Reward);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = redeem_Reward.Redeem_ID }, redeem_Reward);
        }

        // DELETE: api/Redeem_Reward/5
        [ResponseType(typeof(Redeem_Reward))]
        public IHttpActionResult DeleteRedeem_Reward(int id)
        {
            Redeem_Reward redeem_Reward = db.Redeem_Reward.Find(id);
            if (redeem_Reward == null)
            {
                return NotFound();
            }

            db.Redeem_Reward.Remove(redeem_Reward);
            db.SaveChanges();

            return Ok(redeem_Reward);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Redeem_RewardExists(int id)
        {
            return db.Redeem_Reward.Count(e => e.Redeem_ID == id) > 0;
        }
    }
}