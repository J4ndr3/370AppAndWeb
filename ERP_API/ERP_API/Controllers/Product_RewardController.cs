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

namespace ERP_API.Controllers
{
    public class Product_RewardController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Product_Reward
        public IQueryable<Product_Reward> GetProduct_Reward()
        {
            return db.Product_Reward;
        }

        // GET: api/Product_Reward/5
        [ResponseType(typeof(Product_Reward))]
        public IHttpActionResult GetProduct_Reward(int id)
        {
            Product_Reward product_Reward = db.Product_Reward.Find(id);
            if (product_Reward == null)
            {
                return NotFound();
            }

            return Ok(product_Reward);
        }

        // PUT: api/Product_Reward/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProduct_Reward(int id, Product_Reward product_Reward)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != product_Reward.Product_Reward_ID)
            {
                return BadRequest();
            }

            db.Entry(product_Reward).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Product_RewardExists(id))
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

        // POST: api/Product_Reward
        [ResponseType(typeof(Product_Reward))]
        public IHttpActionResult PostProduct_Reward(Product_Reward product_Reward)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Product_Reward.Add(product_Reward);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = product_Reward.Product_Reward_ID }, product_Reward);
        }

        // DELETE: api/Product_Reward/5
        [ResponseType(typeof(Product_Reward))]
        public IHttpActionResult DeleteProduct_Reward(int id)
        {
            Product_Reward product_Reward = db.Product_Reward.Find(id);
            if (product_Reward == null)
            {
                return NotFound();
            }

            db.Product_Reward.Remove(product_Reward);
            db.SaveChanges();

            return Ok(product_Reward);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Product_RewardExists(int id)
        {
            return db.Product_Reward.Count(e => e.Product_Reward_ID == id) > 0;
        }
    }
}