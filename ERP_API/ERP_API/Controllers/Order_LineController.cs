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
    public class Order_LineController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Order_Line
        public IQueryable<Order_Line> GetOrder_Line()
        {
            return db.Order_Line;
        }

        // GET: api/Order_Line/5
        [ResponseType(typeof(Order_Line))]
        public IHttpActionResult GetOrder_Line(int id)
        {
            Order_Line order_Line = db.Order_Line.Find(id);
            if (order_Line == null)
            {
                return NotFound();
            }

            return Ok(order_Line);
        }

        // PUT: api/Order_Line/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOrder_Line(int id, Order_Line order_Line)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != order_Line.Line_ID)
            {
                return BadRequest();
            }

            db.Entry(order_Line).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Order_LineExists(id))
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

        // POST: api/Order_Line
        [ResponseType(typeof(Order_Line))]
        public IHttpActionResult PostOrder_Line(Order_Line order_Line)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Order_Line.Add(order_Line);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = order_Line.Line_ID }, order_Line);
        }

        // DELETE: api/Order_Line/5
        [ResponseType(typeof(Order_Line))]
        public IHttpActionResult DeleteOrder_Line(int id)
        {
            Order_Line order_Line = db.Order_Line.Find(id);
            if (order_Line == null)
            {
                return NotFound();
            }

            db.Order_Line.Remove(order_Line);
            db.SaveChanges();

            return Ok(order_Line);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Order_LineExists(int id)
        {
            return db.Order_Line.Count(e => e.Line_ID == id) > 0;
        }
    }
}