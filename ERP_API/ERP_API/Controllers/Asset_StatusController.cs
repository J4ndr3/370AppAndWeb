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
    public class Asset_StatusController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Asset_Status
       public List<dynamic> GetAsset_Status()
        {
            db.Configuration.ProxyCreationEnabled = false;
            List<Asset_Status> Level = db.Asset_Status.ToList();
            List<dynamic> toReturn = new List<dynamic>();
            foreach (Asset_Status Item in Level)
            {
                dynamic m = new ExpandoObject();
                m.ID = Item.Asset_Status_ID;
                m.Description = Item.Description;
                toReturn.Add(m);
            }
            return toReturn;
        }

        // GET: api/Asset_Status/5
        [ResponseType(typeof(Asset_Status))]
        public IHttpActionResult GetAsset_Status(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Asset_Status asset_Status = db.Asset_Status.Find(id);
            if (asset_Status == null)
            {
                return NotFound();
            }

            return Ok(asset_Status);
        }

        // PUT: api/Asset_Status/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAsset_Status(int id, Asset_Status asset_Status)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != asset_Status.Asset_Status_ID)
            {
                return BadRequest();
            }

            db.Entry(asset_Status).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Asset_StatusExists(id))
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

        // POST: api/Asset_Status
        [ResponseType(typeof(Asset_Status))]
        public IHttpActionResult PostAsset_Status(Asset_Status asset_Status)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Asset_Status.Add(asset_Status);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = asset_Status.Asset_Status_ID }, asset_Status);
        }

        // DELETE: api/Asset_Status/5
        [ResponseType(typeof(Asset_Status))]
        public IHttpActionResult DeleteAsset_Status(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Asset_Status asset_Status = db.Asset_Status.Find(id);
            if (asset_Status == null)
            {
                return NotFound();
            }

            db.Asset_Status.Remove(asset_Status);
            db.SaveChanges();

            return Ok(asset_Status);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Asset_StatusExists(int id)
        {
            return db.Asset_Status.Count(e => e.Asset_Status_ID == id) > 0;
        }
    }
}