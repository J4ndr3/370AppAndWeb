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
    public class AssetsController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Assets
        public List<dynamic> GetAssets()
        {
            db.Configuration.ProxyCreationEnabled = false;
            List<Asset> Level = db.Assets.Include(zz => zz.Asset_Status).Include(zz=>zz.Asset_Type).Include(zz=>zz.Asset_Supplier).ToList();
            List<dynamic> toReturn = new List<dynamic>();
            foreach (Asset Item in Level)
            {
                dynamic m = new ExpandoObject();
                m.ID = Item.Asset_ID.ToString();
                m.Type = Item.Asset_Type.Description;
                m.Status = Item.Asset_Status.Description;
                m.Description = Item.Description;
                var sup = Item.Asset_Supplier.Where(xx => xx.Asset_ID == Item.Asset_ID).Select(zz => zz.Supplier_ID).FirstOrDefault();
                m.Supplier = db.Suppliers.Where(zz => zz.Supplier_ID == sup).Select(xx => xx.Name).FirstOrDefault(); 

               
               

                toReturn.Add(m);
            }
            return toReturn;
        }

        // GET: api/Assets/5
        [ResponseType(typeof(Asset))]
        public IHttpActionResult GetAsset(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Asset asset = db.Assets.Find(id);
            if (asset == null)
            {
                return NotFound();
            }

            return Ok(asset);
        }

        // PUT: api/Assets/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAsset(int id, Asset asset)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != asset.Asset_ID)
            {
                return BadRequest();
            }

            db.Entry(asset).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssetExists(id))
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

        // POST: api/Assets
        [ResponseType(typeof(Asset))]
        public IHttpActionResult PostAsset(Asset asset)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Assets.Add(asset);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = asset.Asset_ID }, asset);
        }
        [System.Web.Http.Route("api/Assets/AS")]
        [HttpPost]
        public IHttpActionResult AS(Asset_Supplier Asset)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Asset_Supplier.Add(Asset);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = Asset.Asset_Supplier_ID }, Asset);
        }
        // DELETE: api/Assets/5
        [ResponseType(typeof(Asset))]
        public IHttpActionResult DeleteAsset(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Asset asset = db.Assets.Find(id);
            if (asset == null)
            {
                return NotFound();
            }

            db.Assets.Remove(asset);
            db.SaveChanges();

            return Ok(asset);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AssetExists(int id)
        {
            return db.Assets.Count(e => e.Asset_ID == id) > 0;
        }
    }
}