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
    
    public partial class User_Role
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public User_Role()
        {
            this.Rangers = new HashSet<Ranger>();
        }
    
        public int User_Role_ID { get; set; }
        public Nullable<int> Access_ID { get; set; }
        public string Description { get; set; }
    
        public virtual Access_Level Access_Level { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Ranger> Rangers { get; set; }
    }
}
