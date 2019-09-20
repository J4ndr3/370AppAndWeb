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
    public class SettingsController : ApiController
    {
        private INF370Entities db = new INF370Entities();

        // GET: api/Settings
        public List<dynamic> GetSettings()
        {
            List<dynamic> toReturn = new List<dynamic>();

            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                List<Setting> Level = db.Settings.ToList();
                foreach (Setting Item in Level)
                {
                    dynamic m = new ExpandoObject();
                    m.ID = Item.SettingID;
                    m.RangerID = Item.Ranger_ID;
                    m.Timer = Item.Timer;
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

        // GET: api/Settings/5
        [ResponseType(typeof(Setting))]
        public IHttpActionResult GetSetting(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Setting setting = db.Settings.Find(id);
            if (setting == null)
            {
                return NotFound();
            }

            return Ok(setting);
        }

        // PUT: api/Settings/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSetting(int id, Setting setting)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != setting.SettingID)
            {
                return BadRequest();
            }

            db.Entry(setting).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SettingExists(id))
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

        // POST: api/Settings
        [ResponseType(typeof(Setting))]
        public IHttpActionResult PostSetting(Setting setting)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Settings.Add(setting);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = setting.SettingID }, setting);
        }

        // DELETE: api/Settings/5
        [ResponseType(typeof(Setting))]
        public IHttpActionResult DeleteSetting(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Setting setting = db.Settings.Find(id);
            if (setting == null)
            {
                return NotFound();
            }

            db.Settings.Remove(setting);
            db.SaveChanges();

            return Ok(setting);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SettingExists(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.Settings.Count(e => e.SettingID == id) > 0;
        }
    }
}