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
    public class CellphonesController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Cellphones
        public IQueryable<Cellphone> GetCellphones()
        {
            return db.Cellphones;
        }

        // GET: api/Cellphones/5
        [ResponseType(typeof(Cellphone))]
        public IHttpActionResult GetCellphone(int id)
        {
            Cellphone cellphone = db.Cellphones.Find(id);
            if (cellphone == null)
            {
                return NotFound();
            }

            return Ok(cellphone);
        }

        // PUT: api/Cellphones/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCellphone(int id, Cellphone cellphone)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cellphone.IMEI)
            {
                return BadRequest();
            }

            db.Entry(cellphone).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CellphoneExists(id))
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

        // POST: api/Cellphones
        [ResponseType(typeof(Cellphone))]
        public IHttpActionResult PostCellphone(Cellphone cellphone)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Cellphones.Add(cellphone);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (CellphoneExists(cellphone.IMEI))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = cellphone.IMEI }, cellphone);
        }

        // DELETE: api/Cellphones/5
        [ResponseType(typeof(Cellphone))]
        public IHttpActionResult DeleteCellphone(int id)
        {
            Cellphone cellphone = db.Cellphones.Find(id);
            if (cellphone == null)
            {
                return NotFound();
            }

            db.Cellphones.Remove(cellphone);
            db.SaveChanges();

            return Ok(cellphone);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CellphoneExists(int id)
        {
            return db.Cellphones.Count(e => e.IMEI == id) > 0;
        }
    }
}