//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ERP_API.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Tracking
    {
        public int Tracking_ID { get; set; }
        public decimal Longitude { get; set; }
        public decimal Lattitude { get; set; }
        public int Patrol_Log_ID { get; set; }
    
        public virtual Patrol_Log Patrol_Log { get; set; }
    }
}
