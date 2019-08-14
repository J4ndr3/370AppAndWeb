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
    public class Marker_TypeController : ApiController
    {

        private INF370Entities db = new INF370Entities();

        // GET: api/Marker_Type
        public List<dynamic> GetMarker_Type()
        {
            List<dynamic> toReturn = new List<dynamic>();
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                List<Marker_Type> Types = db.Marker_Type.ToList();

                foreach (Marker_Type Item in Types)
                {
                    dynamic m = new ExpandoObject();
                    m.Marker_Type_ID = Item.Marker_Type_ID;
                    m.Type = Item.Type;
                    m.Points_Worth = Item.Points_Worth;
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


        // GET: api/Marker_Type/5
        [ResponseType(typeof(Marker_Type))]
        public IHttpActionResult GetMarker_Type(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Marker_Type marker_Type = db.Marker_Type.Find(id);
            if (marker_Type == null)
            {
                return Ok(1);
            }

            return Ok(marker_Type);
        }

        // PUT: api/Marker_Type/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMarker_Type(int id, Marker_Type marker_Type)
        {
            db.Configuration.ProxyCreationEnabled = false;
            try { 
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != marker_Type.Marker_Type_ID)
            {
                return BadRequest();
            }

            db.Entry(marker_Type).State = EntityState.Modified;
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Marker_TypeExists(id))
                {
                    return Ok(1);
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }
            catch
            {
                return Ok(2);
    }


}

        // POST: api/Marker_Type
        [ResponseType(typeof(Marker_Type))]
        public IHttpActionResult PostMarker_Type(Marker_Type marker_Type)
        {
            db.Configuration.ProxyCreationEnabled = false;
            //try
            //{
            //    if (db.Marker_Type.Contains(marker_Type))
            //    {
            //        return Ok(1);
            //    }
            //    else
            //    {
                    if (!ModelState.IsValid)
                    {
                        return BadRequest(ModelState);
                    }

                    db.Marker_Type.Add(marker_Type);
                    db.SaveChanges();

                    return CreatedAtRoute("DefaultApi", new { id = marker_Type.Marker_Type_ID }, marker_Type);
                }
            //}
            //catch
            //{
            //    return Ok(2);
            //}
        //}

    // DELETE: api/Marker_Type/5
    [ResponseType(typeof(Marker_Type))]
        public IHttpActionResult DeleteMarker_Type(int id)
        {
            try
            {

                db.Configuration.ProxyCreationEnabled = false;
                Marker_Type marker_Type = db.Marker_Type.Find(id);
                if (marker_Type == null)
                {
                    return Ok(1);
                }

                db.Marker_Type.Remove(marker_Type);
                db.SaveChanges();

                return Ok(marker_Type);
            }
            catch
            {
                return Ok(2);
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Marker_TypeExists(int id)
        {
            return db.Marker_Type.Count(e => e.Marker_Type_ID == id) > 0;
        }
    }
}