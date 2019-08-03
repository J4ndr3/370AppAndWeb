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
    public class Product_TypeController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Product_Type
        public IQueryable<Product_Type> GetProduct_Type()
        {
            return db.Product_Type;
        }

        // GET: api/Product_Type/5
        [ResponseType(typeof(Product_Type))]
        public IHttpActionResult GetProduct_Type(int id)
        {
            Product_Type product_Type = db.Product_Type.Find(id);
            if (product_Type == null)
            {
                return NotFound();
            }

            return Ok(product_Type);
        }

        // PUT: api/Product_Type/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProduct_Type(int id, Product_Type product_Type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != product_Type.Prod_ID)
            {
                return BadRequest();
            }

            db.Entry(product_Type).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Product_TypeExists(id))
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

        // POST: api/Product_Type
        [ResponseType(typeof(Product_Type))]
        public IHttpActionResult PostProduct_Type(Product_Type product_Type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Product_Type.Add(product_Type);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = product_Type.Prod_ID }, product_Type);
        }

        // DELETE: api/Product_Type/5
        [ResponseType(typeof(Product_Type))]
        public IHttpActionResult DeleteProduct_Type(int id)
        {
            Product_Type product_Type = db.Product_Type.Find(id);
            if (product_Type == null)
            {
                return NotFound();
            }

            db.Product_Type.Remove(product_Type);
            db.SaveChanges();

            return Ok(product_Type);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Product_TypeExists(int id)
        {
            return db.Product_Type.Count(e => e.Prod_ID == id) > 0;
        }
    }
}