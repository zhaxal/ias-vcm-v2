/* eslint-disable @typescript-eslint/no-explicit-any */
import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  // 1. equipment (no deps)
  await db.schema
    .createTable('equipment')
    .addColumn('equipment_id', 'serial', col => col.primaryKey())
    .addColumn('model', 'varchar(255)', col => col.notNull())
    .addColumn('type', 'varchar(255)', col => col.notNull())
    .addColumn('board_no', 'varchar(255)', col => col.notNull().unique())
    .addColumn('name', 'varchar(255)', col => col.notNull())
    .addColumn('current_hours', 'integer', col => col.notNull().defaultTo(0))
    .addColumn('created_at', 'timestamp', col => col.notNull().defaultTo(sql`now()`))
    .addColumn('updated_at', 'timestamp', col => col.notNull().defaultTo(sql`now()`))
    .execute()

  // 2. part (no deps)
  await db.schema
    .createTable('part')
    .addColumn('part_id', 'serial', col => col.primaryKey())
    .addColumn('mdm_code', 'varchar(255)', col => col.notNull().unique())
    .addColumn('smat_code', 'varchar(255)')
    .addColumn('cross_no', 'varchar(255)')
    .addColumn('name', 'varchar(255)', col => col.notNull())
    .addColumn('unit', 'varchar(255)', col => col.notNull())
    .addColumn('category', 'varchar(255)')
    .addColumn('price', sql`numeric(10,2)`, col => col.notNull().defaultTo(0))
    .addColumn('created_at', 'timestamp', col => col.notNull().defaultTo(sql`now()`))
    .addColumn('updated_at', 'timestamp', col => col.notNull().defaultTo(sql`now()`))
    .execute()

  await db.schema.createIndex('part_smat_code_idx').on('part').column('smat_code').execute()
  await db.schema.createIndex('part_cross_no_idx').on('part').column('cross_no').execute()

  // 3. warehouse (no deps)
  await db.schema
    .createTable('warehouse')
    .addColumn('warehouse_id', 'serial', col => col.primaryKey())
    .addColumn('code', 'varchar(255)', col => col.notNull().unique())
    .addColumn('name', 'varchar(255)', col => col.notNull())
    .addColumn('location', 'varchar(255)')
    .addColumn('created_at', 'timestamp', col => col.notNull().defaultTo(sql`now()`))
    .addColumn('updated_at', 'timestamp', col => col.notNull().defaultTo(sql`now()`))
    .execute()

  // 4. supplier (no deps)
  await db.schema
    .createTable('supplier')
    .addColumn('supplier_id', 'serial', col => col.primaryKey())
    .addColumn('name', 'varchar(255)', col => col.notNull())
    .addColumn('created_at', 'timestamp', col => col.notNull().defaultTo(sql`now()`))
    .addColumn('updated_at', 'timestamp', col => col.notNull().defaultTo(sql`now()`))
    .execute()

  // 5. part_instance (deps: part, equipment, warehouse, supplier)
  //    XOR constraint: exactly one of equipment_id or warehouse_id must be set
  await db.schema
    .createTable('part_instance')
    .addColumn('part_instance_id', 'serial', col => col.primaryKey())
    .addColumn('part_id', 'integer', col =>
      col.notNull().references('part.part_id').onDelete('restrict')
    )
    .addColumn('equipment_id', 'integer', col =>
      col.references('equipment.equipment_id').onDelete('restrict')
    )
    .addColumn('warehouse_id', 'integer', col =>
      col.references('warehouse.warehouse_id').onDelete('restrict')
    )
    .addColumn('supplier_id', 'integer', col =>
      col.references('supplier.supplier_id').onDelete('restrict')
    )
    .addColumn('quantity', 'integer', col => col.notNull())
    .addColumn('unit_price', sql`numeric(10,2)`, col => col.notNull())
    .addColumn('created_at', 'timestamp', col => col.notNull().defaultTo(sql`now()`))
    .addColumn('updated_at', 'timestamp', col => col.notNull().defaultTo(sql`now()`))
    .addCheckConstraint(
      'part_instance_xor_location',
      sql`(equipment_id IS NOT NULL) <> (warehouse_id IS NOT NULL)`
    )
    .execute()

  await db.schema.createIndex('part_instance_part_id_idx').on('part_instance').column('part_id').execute()
  await db.schema.createIndex('part_instance_warehouse_id_idx').on('part_instance').column('warehouse_id').execute()
  await db.schema.createIndex('part_instance_equipment_id_idx').on('part_instance').column('equipment_id').execute()

  // 6. repair_job (deps: equipment, part_instance)
  await db.schema
    .createTable('repair_job')
    .addColumn('job_id', 'serial', col => col.primaryKey())
    .addColumn('job_number', 'varchar(255)', col => col.notNull().unique())
    .addColumn('equipment_id', 'integer', col =>
      col.notNull().references('equipment.equipment_id').onDelete('restrict')
    )
    .addColumn('part_instance_id', 'integer', col =>
      col.references('part_instance.part_instance_id').onDelete('restrict')
    )
    .addColumn('repair_type', 'varchar(255)', col => col.notNull())
    .addColumn('repair_start_date', 'timestamp')
    .addColumn('repair_end_date', 'timestamp')
    .addColumn('equipment_work_hours', 'integer')
    .addColumn('equipment_mileage', 'integer')
    .addColumn('total_amount', sql`numeric(10,2)`)
    .addColumn('description', 'text')
    .addColumn('created_at', 'timestamp', col => col.notNull().defaultTo(sql`now()`))
    .addCheckConstraint(
      'repair_job_repair_type_check',
      sql`repair_type IN ('planned', 'emergency')`
    )
    .addCheckConstraint(
      'repair_job_dates_check',
      sql`repair_end_date IS NULL OR repair_start_date IS NULL OR repair_end_date >= repair_start_date`
    )
    .execute()

  await db.schema.createIndex('repair_job_equipment_id_idx').on('repair_job').column('equipment_id').execute()
  await db.schema.createIndex('repair_job_repair_type_idx').on('repair_job').column('repair_type').execute()

  // 7. equipment_part_norm (deps: equipment, part)
  await db.schema
    .createTable('equipment_part_norm')
    .addColumn('norm_id', 'serial', col => col.primaryKey())
    .addColumn('equipment_id', 'integer', col =>
      col.notNull().references('equipment.equipment_id').onDelete('restrict')
    )
    .addColumn('part_id', 'integer', col =>
      col.notNull().references('part.part_id').onDelete('restrict')
    )
    .addColumn('replacement_interval_hours', 'integer')
    .addColumn('replacement_interval_mileage', 'integer')
    .addColumn('created_at', 'timestamp', col => col.notNull().defaultTo(sql`now()`))
    .addColumn('updated_at', 'timestamp', col => col.notNull().defaultTo(sql`now()`))
    .addCheckConstraint(
      'equipment_part_norm_interval_check',
      sql`replacement_interval_hours IS NOT NULL OR replacement_interval_mileage IS NOT NULL`
    )
    .addUniqueConstraint('equipment_part_norm_unique', ['equipment_id', 'part_id'])
    .execute()

  await db.schema.createIndex('equipment_part_norm_equipment_id_idx').on('equipment_part_norm').column('equipment_id').execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  // Drop in reverse dependency order
  await db.schema.dropTable('equipment_part_norm').execute()
  await db.schema.dropTable('repair_job').execute()
  await db.schema.dropTable('part_instance').execute()
  await db.schema.dropTable('supplier').execute()
  await db.schema.dropTable('warehouse').execute()
  await db.schema.dropTable('part').execute()
  await db.schema.dropTable('equipment').execute()
}