using Riok.Mapperly.Abstractions;
using AMR_Study.Models;

namespace AMR_Study.Mappers
{
    [Mapper]
    public partial class ResultsMapper
    {
        public partial PatientDetails Results(PatientDetailsAddVm hosp);
    }
}
