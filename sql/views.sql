create view rfdb.candidates_view
            ("Nominal ID", "Workplan ID", "Site Identified", "Colocate", "Site Category", "SiteOwner",
             "SiteStructureType", "SiteStructureHeight", "SiteBuildingHeight", "SiteType", "SiteName", "Site ID",
             "Latitude", "Longitude", "RF Prelim Azimuth", "Site Visit Report Approved by RF",
             "Site Visit Report Rejected by RF", "Site Visit Report Remarks RF",
             "Site Visit Report Review Status by RF", "RF Active Antenna Min AGL", "TSSR Approval date by RF",
             "TSSR Checked by RF", "TSSR Rejected date by RF", "TSSR Remarks by RF", "TSSR Review Status by RF",
             "RF PIC.1", "Design Status", "Dates||Design Complete", "DNB Target", "Comments", "District",
             "Cluster_Name")
as
SELECT erisite."Nominal ID",
       erisite."Workplan ID",
       erisite."Site Identified",
       erisite."Colocate",
       erisite."Site Category",
       esite."SiteOwner",
       esite."SiteStructureType",
       esite."SiteStructureHeight",
       esite."SiteBuildingHeight",
       esite."SiteType",
       esite."SiteName",
       erisite."Site ID",
       erisite."Latitude",
       erisite."Longitude",
       erisite."RF Prelim Azimuth",
       erisite."Site Visit Report Approved by RF",
       erisite."Site Visit Report Rejected by RF",
       erisite."Site Visit Report Remarks RF",
       erisite."Site Visit Report Review Status by RF",
       erisite."RF Active Antenna Min AGL",
       erisite."TSSR Approval date by RF",
       erisite."TSSR Checked by RF",
       erisite."TSSR Rejected date by RF",
       erisite."TSSR Remarks by RF",
       erisite."TSSR Review Status by RF",
       erisite."RF PIC.1",
       rf_dd."Design Status",
       rf_dd."Dates||Design Complete",
       rf_dd."DNB Target",
       rf_dd."Comments",
       mukim."Mukim_name",
       clusters."Cluster_name",
       clusters."DISTRICT"
FROM erisite_drt erisite
         LEFT JOIN "myesite_SiteLevelData" esite ON esite."WorkplanID" = erisite."Workplan ID"
         LEFT JOIN rf_detailed_design rf_dd ON rf_dd."Workplan ID" = erisite."Workplan ID"
         JOIN mukim_district mukim ON st_within(
        st_setsrid(st_point(esite."SiteLongitude"::double precision, esite."SiteLatitude"::double precision), 4326),
        mukim.geom)
         JOIN clusters ON st_within(
        st_setsrid(st_point(esite."SiteLongitude"::double precision, esite."SiteLatitude"::double precision), 4326),
        clusters.geom);
alter table candidates_view
    owner to postgres;


create view rfdb.config_view
            (
             "Workplan ID",
             nominal_id,
             nominal_siteid,
             "LocationSiteId",
             "System",
             "SectorId",
             "AntModel",
             "AntDirection",
             "AntHeight",
             "AntMtilt",
             "AntEtilt"
                )
as
SELECT "Workplan ID",
       nominal.nominal_id,
       nominal.nominal_siteid,
       esite."LocationSiteId",
       esector."System",
       esector."SectorId",
       esector."AntModel",
       esector."AntDirection",
       esector."AntHeight",
       esector."AntMtilt",
       esector."AntEtilt"
FROM erisite_drt drt
         INNER JOIN "myesite_SiteLevelData" esite on drt."Workplan ID" = esite."WorkplanID"
         INNER JOIN "myesite_SectorLevelData" esector
                    on esite."SiteProjectName" = esector."SiteProjectName" and esite."SiteName" = esector."SiteName"
         INNER JOIN rf_nominal nominal on nominal.nominal_siteid = esector."LocationSiteId";
alter table rfdb.config_view
    owner to postgres;

create view rfdb.nominal_view
            (geom, dnb_index, nominal_siteid, nominal_id, rf_pic, active_model, morphology, nominal_latitude,
             nominal_longitude, phase_deployment, phase_commercial, nominal_change_log, "District", "State")
as
SELECT nominal.geom,
       nominal.dnb_index,
       nominal.nominal_siteid,
       nominal.nominal_id,
       nominal.rf_pic,
       nominal.active_model,
       nominal.morphology,
       nominal.nominal_latitude,
       nominal.nominal_longitude,
       nominal.phase_deployment,
       nominal.phase_commercial,
       nominal.nominal_change_log,
       polygons."District",
       polygons."State"
FROM rf_nominal nominal
         JOIN mukim_district polygons ON st_within(nominal.geom, polygons.geom);
alter table rfdb.nominal_view
    owner to postgres;


