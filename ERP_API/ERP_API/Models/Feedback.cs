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
    
    public partial class Feedback
    {
        public int Feedback_ID { get; set; }
        public string Description { get; set; }
        public System.DateTime Date { get; set; }
        public int Patrol_Log_ID { get; set; }
        public int Patrol_Booking_ID { get; set; }
        public int Ranger_ID { get; set; }
    
        public virtual Patrol_Log Patrol_Log { get; set; }
        public virtual Patrol_Booking Patrol_Booking { get; set; }
        public virtual Ranger Ranger { get; set; }
    }
}
