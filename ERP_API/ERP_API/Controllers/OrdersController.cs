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
    public class OrdersController : ApiController
    {
       
        private INF370Entities db = new INF370Entities();

        // GET: api/Orders
        public List<dynamic> GetOrders()
        {
            db.Configuration.ProxyCreationEnabled = false;
            List<Order> Level = db.Orders.Include(zz => zz.Supplier).Include(zz => zz.Supplier.Asset_Supplier).Include(zz=>zz.Order_Line)
                .ToList();
            List<dynamic> toReturn = new List<dynamic>();
            foreach (Order Item in Level)
            {
                dynamic m = new ExpandoObject();
                m.ID = Item.Order_ID;
                m.Date = Item.Date;
                var Asset_ID = Item.Order_Line.Where(zz => zz.Order_ID == Item.Order_ID).Select(zz => zz.Asset_ID).FirstOrDefault();
                m.Asset = db.Assets.Where(zz=>zz.Asset_ID == Asset_ID).Select(zz=>zz.Description).FirstOrDefault();
                m.Type = db.Assets.Include(zz=>zz.Asset_Type).Where(zz=>zz.Asset_ID == Asset_ID).Select(zz=>zz.Asset_Type.Description).FirstOrDefault();
                m.Supplier = Item.Supplier.Name;
                m.Status = Item.Status;
                toReturn.Add(m);
            }
            return (toReturn);
        }

                // GET: api/Orders/5
        [ResponseType(typeof(Order))]
        public IHttpActionResult GetOrder(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Order order = db.Orders.Find(id);
            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        // PUT: api/Orders/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOrder(int id, Order order)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != order.Order_ID)
            {
                return BadRequest();
            }

            db.Entry(order).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Orders
        [ResponseType(typeof(Order))]
        public IHttpActionResult PostOrder(Order order)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Orders.Add(order);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = order.Order_ID }, order);
        }

        // DELETE: api/Orders/5
        [ResponseType(typeof(Order))]
        public IHttpActionResult DeleteOrder(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Order order = db.Orders.Find(id);
            if (order == null)
            {
                return NotFound();
            }

            db.Orders.Remove(order);
            db.SaveChanges();

            return Ok(order);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrderExists(int id)
        {
            return db.Orders.Count(e => e.Order_ID == id) > 0;
        }
    }
}