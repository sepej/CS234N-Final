﻿using System;
using System.Collections.Generic;

namespace BITSEFClasses.Models
{
    public partial class UnitType
    {
        public UnitType()
        {
            Ingredient = new HashSet<Ingredient>();
        }

        public int UnitTypeId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Ingredient> Ingredient { get; set; }
    }
}
