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
    public class Asset_TypeController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Asset_Type
        public List<dynamic> GetAsset_Type()
        {
            db.Configuration.ProxyCreationEnabled = false;
            List<Asset_Type> Level = db.Asset_Type.ToList();
            List<dynamic> toReturn = new List<dynamic>();
            foreach (Asset_Type Item in Level)
            {
                dynamic m = new ExpandoObject();
                m.ID = Item.Asset_Type_ID;
                m.Description = Item.Description;
                toReturn.Add(m);
            }
            return toReturn;
        }

        // GET: api/Asset_Type/5
        [ResponseType(typeof(Asset_Type))]
        public IHttpActionResult GetAsset_Type(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Asset_Type asset_Type = db.Asset_Type.Find(id);
            if (asset_Type == null)
            {
                return NotFound();
            }

            return Ok(asset_Type);
        }

        // PUT: api/Asset_Type/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAsset_Type(int id, Asset_Type asset_Type)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != asset_Type.Asset_Type_ID)
            {
                return BadRequest();
            }

            db.Entry(asset_Type).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Asset_TypeExists(id))
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

        // POST: api/Asset_Type
        [ResponseType(typeof(Asset_Type))]
        public IHttpActionResult PostAsset_Type(Asset_Type asset_Type)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Asset_Type.Add(asset_Type);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = asset_Type.Asset_Type_ID }, asset_Type);
        }

        // DELETE: api/Asset_Type/5
        [ResponseType(typeof(Asset_Type))]
        public IHttpActionResult DeleteAsset_Type(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Asset_Type asset_Type = db.Asset_Type.Find(id);
            if (asset_Type == null)
            {
                return NotFound();
            }

            db.Asset_Type.Remove(asset_Type);
            db.SaveChanges();

            return Ok(asset_Type);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Asset_TypeExists(int id)
        {
            return db.Asset_Type.Count(e => e.Asset_Type_ID == id) > 0;
        }
    }
}